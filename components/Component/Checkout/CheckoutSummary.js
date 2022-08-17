import { formatCurrency } from "../../../public/src/shared/helper";

const CheckoutSummary = (props) => {
  const { totalAmount } = props;

  return (
    <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
      <span>Total</span>
      <span>{formatCurrency(totalAmount)}</span>
    </div>
  );
};

export default CheckoutSummary;
