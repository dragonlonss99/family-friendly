import Image from "next/image";

const getdefaultIcon = (code: string) => {
  switch (code) {
    case "A":
      return "/img/g1.svg";
    case "B":
      return "/img/g2.svg";
    case "C":
      return "/img/g3.svg";
    case "D":
      return "/img/g4.svg";
    case "E":
      return "/img/g5.svg";
    case "F":
      return "/img/g6.svg";
    case "G":
      return "/img/g7.svg";
    case "H":
      return "/img/g8.svg";
    default:
      return "";
  }
};
const ProductGroup = ({ productGroupInfo }: { productGroupInfo: any }) => {
  const { categories, code, iconURL, name, qty } = productGroupInfo;
  if (!qty) return null;
  const imageSrc = iconURL || getdefaultIcon(code);
  return (
    <div className="flex flex-col items-center gap-1 bg-white rounded-md p-2 text-black">
      {imageSrc && (
        <Image src={imageSrc} alt={name || code} width={32} height={32} />
      )}
      <div className="text-xs sm:text-lg">{name || code}</div>
      <div className="text-sm sm:text-lg font-bold">{qty}</div>
    </div>
  );
};

export default ProductGroup;
