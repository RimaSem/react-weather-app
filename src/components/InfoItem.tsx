import { ReactNode } from "react";

type InfoItemProps = {
  addClass: string;
  img: string;
  label: string;
  itemData: string | number;
  children?: ReactNode;
};

function InfoItem({ addClass, img, label, itemData, children }: InfoItemProps) {
  return (
    <div className={{ addClass } + " item"}>
      <img src={img} />
      <div className="mini-container">
        <div className="label">{label}</div>
        <div className="data">
          {itemData}
          {children}
        </div>
      </div>
    </div>
  );
}

export default InfoItem;
