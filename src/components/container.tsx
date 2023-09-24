import { FC } from 'react';
import { ContainerComponentProps } from './interfaces';

export const ContainerComponent: FC<ContainerComponentProps> = ({ children, columeCount }) => {
  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: new Array(columeCount).fill('1fr').join(' '),
        gridColumn: columeCount,
        gap: 2,
      }}
    >
      {children}
    </div>
  );
};
