import { useEffect, useState } from "react";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const ButtonComponent = ({
  postUserId,
  published,
  onClick,
  isAddToCart,
  isRemove,
  isInCart,
  isCheckout,
  className,
}) => {
  const { data: session } = useSession();

  const [purchaseEnabled, enablePurchase] = useState(false);
  const [sellEnabled, enableSell] = useState(false);

  useEffect(() => {
    const { user } = { ...session };
    enableSell(!_.isEmpty(user) && user.id === postUserId && !published);
    enablePurchase(!_.isEmpty(user) && user.id !== postUserId);
  }, [session]);

  if (!session) return null;

  if (isCheckout) {
    return (
      <Button
        variant="contained"
        onClick={onClick}
        startIcon={<ShoppingCartCheckoutIcon />}
        className={className}
      >
        Checkout
      </Button>
    );
  }

  if (isRemove) {
    return (
      <Button color="warning" onClick={onClick} className={className}>
        Remove
      </Button>
    );
  }

  if (isAddToCart) {
    if (isInCart) {
      return (
        <Button
          type="error"
          disabled
          className={className}
          style={{ color: "rgb(190 18 60)" }}
        >
          In Your Cart
        </Button>
      );
    }
    return (
      <Button
        color="secondary"
        onClick={(e) => onClick(e)}
        className={className}
      >
        Add to Cart
      </Button>
    );
  }

  if (!sellEnabled && !purchaseEnabled) {
    return (
      <Button disabled className="bg-red-600">
        Selling
      </Button>
    );
  }

  return (
    <Button
      color="success"
      variant="outlined"
      onClick={(e) => onClick(e, purchaseEnabled)}
      className={className}
    >
      {purchaseEnabled ? "Purchase" : "Sell"}
    </Button>
  );
};

export default ButtonComponent;
