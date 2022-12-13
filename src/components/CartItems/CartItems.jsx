import "./CartItems.css";

export default function CartItems({ items }) {
  return (
    <div id="Profile_Cart">
      {items?.map((c) => (
        <div key={c.id} className="profile_cart_item">
          <img src={c.images[0]} alt="ram" width={70} />
          <span>{c.title.split(" ")[0] + c.title.split(" ")[1] + " " + c.title.split(" ")[2] + " " + c.title.split(" ")[3] + " "}</span>
          <span>${c.price}</span>
          <span>x {c.itemEnCarro.quantity}</span>
        </div>
      ))}
    </div>
  );
}
