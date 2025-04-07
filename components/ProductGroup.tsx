import Image from "next/image";

const ProductGroup = ({ productGroupInfo }: { productGroupInfo: any }) => {
  const { categories, code, iconURL, name, qty } = productGroupInfo;
  return (
    <div className="flex flex-col items-center gap-1 bg-white rounded-md p-2 text-black">
      <Image src={iconURL} alt={name} width={32} height={32} />
      <div className="text-xs sm:text-lg">{name}</div>
      <div className="text-sm sm:text-lg font-bold">{qty}</div>
    </div>
  );
};

export default ProductGroup;
