import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tree from 'react-d3-tree';
import { toast } from 'react-toastify';
import './FamilyTree.css';

const FamilyTree = () => {
  const { id } = useParams();
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFamilyTree();
  }, [id]);

  const fetchFamilyTree = async () => {
    try {
      const res = await axios.get(`/api/persons/family-tree/${id}`);
      const data = res.data.data;
      
      // Chuyển đổi dữ liệu sang format react-d3-tree
      const formattedData = formatTreeData(data);
      setTreeData(formattedData);
    } catch (error) {
      toast.error('Lỗi khi tải cây gia phả');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatTreeData = (persons) => {
    if (!persons || persons.length === 0) {
      return null;
    }

    const formatNode = (person) => {
      return {
        name: person.fullName,
        attributes: {
          Gender: person.gender,
          Generation: `Đời ${person.generation}`,
          Born: person.dateOfBirth ? new Date(person.dateOfBirth).getFullYear() : 'N/A',
          Status: person.isAlive ? 'Còn sống' : 'Đã mất'
        },
        children: person.children && person.children.length > 0
          ? person.children.map(child => formatNode(child))
          : []
      };
    };

    // Lấy người gốc (root) - thường là người đầu tiên trong mảng
    return formatNode(persons[0]);
  };

  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <circle r={20} fill={nodeDatum.attributes?.Gender === 'Nam' ? '#3498db' : '#e91e63'} />
      <text fill="white" strokeWidth="0" x="0" y="5" textAnchor="middle" fontSize="10">
        {nodeDatum.name.split(' ').pop()}
      </text>
      <text fill="black" x="30" y="5" fontSize="12">
        {nodeDatum.name}
      </text>
      <text fill="gray" x="30" y="20" fontSize="10">
        {nodeDatum.attributes?.Generation}
      </text>
    </g>
  );

  if (loading) {
    return <div className="loading">Đang tải cây gia phả...</div>;
  }

  if (!treeData) {
    return (
      <div className="container">
        <div className="error">Không có dữ liệu cây gia phả</div>
      </div>
    );
  }

  return (
    <div className="family-tree-page">
      <div className="tree-controls">
        <h2>Cây Gia Phả</h2>
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color male"></span> Nam
          </div>
          <div className="legend-item">
            <span className="legend-color female"></span> Nữ
          </div>
        </div>
      </div>
      <div className="tree-container">
        <Tree
          data={treeData}
          orientation="vertical"
          pathFunc="step"
          translate={{ x: 400, y: 50 }}
          nodeSize={{ x: 200, y: 150 }}
          renderCustomNodeElement={renderCustomNode}
          separation={{ siblings: 2, nonSiblings: 2 }}
          zoom={0.8}
        />
      </div>
    </div>
  );
};

export default FamilyTree;
