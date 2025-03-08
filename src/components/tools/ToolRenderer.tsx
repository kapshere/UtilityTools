
import React from 'react';
import Calculator from './Calculator';
import UnitConverter from './UnitConverter';
import DateCalculator from './DateCalculator';
import QrGenerator from './QrGenerator';
import JsonFormatter from './JsonFormatter';
import Base64Encoder from './Base64Encoder';
import PasswordGenerator from './PasswordGenerator';
import ImageCompressor from './ImageCompressor';
import NotImplemented from './NotImplemented';

interface ToolRendererProps {
  toolId: string;
}

// This component renders the appropriate tool based on the tool ID
const ToolRenderer: React.FC<ToolRendererProps> = ({ toolId }) => {
  // Map of tool IDs to their corresponding components
  const toolComponents: Record<string, React.ComponentType> = {
    'calculator': Calculator,
    'unit-converter': UnitConverter,
    'date-calculator': DateCalculator,
    'qr-generator': QrGenerator,
    'json-formatter': JsonFormatter,
    'base64-encoder': Base64Encoder,
    'password-generator': PasswordGenerator,
    'image-compressor': ImageCompressor,
    // Add more tool mappings here
  };

  // Get the component for the specified tool ID
  const ToolComponent = toolComponents[toolId] || NotImplemented;
  
  return <ToolComponent />;
};

export default ToolRenderer;
