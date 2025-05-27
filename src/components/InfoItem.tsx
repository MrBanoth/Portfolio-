import React from 'react';

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <span className="text-neutral-400 mr-4">{label}</span>
        <span className="text-white font-light">:</span>
        <span className="ml-4">{value}</span>
      </div>
      <div className="h-px bg-neutral-800 mt-4"></div>
    </div>
  );
};

export default InfoItem;