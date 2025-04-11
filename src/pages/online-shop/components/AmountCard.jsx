function AmountCard({ title, number }) {
  return (
    <>
      <div className="border flex flex-col rounded-xl shadow-md gap-3 py-3 pl-3 w-full">
        <p className="text-gray-400 font-medium txet-sm">{title}</p>
        <p className="text-2xl font-semibold">{number}</p>
      </div>
    </>
  );
}

export default AmountCard;
