import React from 'react';
import ContentLoader from 'react-content-loader';


export function Skeleton() {
  return (
    <ContentLoader 
    speed={2}
    width={400}
    height={250}
    viewBox="0 0 400 250"
    backgroundColor="#646464"
    foregroundColor="#ecebeb"
    >
    <rect x="102" y="371" rx="2" ry="2" width="140" height="10" /> 
    <rect x="124" y="32" rx="0" ry="0" width="5" height="2" /> 
    <rect x="90" y="199" rx="0" ry="0" width="0" height="1" /> 
    <rect x="25" y="0" rx="24" ry="14" width="350" height="200" /> 
    <rect x="30" y="210" rx="0" ry="0" width="250" height="35" /> 
    <rect x="310" y="210" rx="14" ry="14" width="60" height="35" />
  </ContentLoader>
  );
}
