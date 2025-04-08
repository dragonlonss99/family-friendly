import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
const ProductGroup = ({
  productGroupInfo,
  shopKey,
  selectedProductGroup,
  setSelectedProductGroup,
}: {
  productGroupInfo: any;
  shopKey: string;
  selectedProductGroup?: string;
  setSelectedProductGroup?: (code: string) => void;
}) => {
  const { categories, code, iconURL, name, qty } = productGroupInfo;
  const pathname = usePathname();
  if (!qty) return null;
  const imageSrc = iconURL || getdefaultIcon(code);
  const isShopPage = pathname.includes("/shop");
  const isSelected = selectedProductGroup === code;
  const handleClick = (e: any) => {
    if (!isShopPage) return;
    e.preventDefault();
    setSelectedProductGroup?.(code);
    history.pushState(null, '', `/shop/${shopKey}?code=${code}`);
  };
  return (
    <Link
      href={`/shop/${shopKey}?code=${code}`}
      className={`flex flex-col items-center gap-1 rounded-md p-2 text-black cursor-pointer ${
        isShopPage && !isSelected ? "bg-[#F3FCFD]" : "bg-white"
      }`}
      onClick={handleClick}
    >
      {imageSrc && (
        <Image src={imageSrc} alt={name || code} width={32} height={32} />
      )}
      <div className="text-xs sm:text-lg">{name || code}</div>
      <div className="text-sm sm:text-lg font-bold">{qty}</div>
    </Link>
  );
};

export default ProductGroup;
