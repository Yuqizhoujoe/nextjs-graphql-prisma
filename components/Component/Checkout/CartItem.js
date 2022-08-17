import { formatCurrency } from "../../../public/src/shared/helper";
import ButtonComponent from "../Common/ButtonComponent";

const CartItem = (props) => {
  const { id, title, image, price, onRemove } = props;

  return (
    <li
      key={id}
      className="grid grid-cols-6 grid-rows-2 gap-2 border-b-1 items-center justify-center justi"
    >
      <div className="col-start-1 col-end-3 row-start-1 row-end-3 self-center">
        <img src={image} alt={title} className="rounded w-full" />
      </div>
      <div className="flex flex-col col-start-3 col-end-5 row-span-2 pt-2">
        <span className="text-gray-600 text-md font-semi-bold">{title}</span>
      </div>
      <div className="col-start-5 col-end-6 row-span-2 pt-3 flex justify-center">
        <span className="text-pink-400 font-semibold inline-block">
          {formatCurrency(price)}
        </span>
      </div>
      <div className="col-start-6 col-end-7 row-span-2 pt-3 flex justify-center">
        <ButtonComponent isRemove onClick={onRemove} />
      </div>
    </li>
  );
};

export default CartItem;
