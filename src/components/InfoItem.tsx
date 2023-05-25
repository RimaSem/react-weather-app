import { ReactNode } from "react";

interface InfoItemProps {
  addClass: string;
  img: string;
  label: string;
  itemData: string | number;
  children?: ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({
  addClass,
  img,
  label,
  itemData,
  children,
}) => (
  <div className={{ addClass } + " item"}>
    <img src={img} alt={label + " icon"} />
    <div className="mini-container">
      <div className="label">{label}</div>
      <div className="data">
        {itemData}
        {children}
      </div>
    </div>
  </div>
);

export default InfoItem;
