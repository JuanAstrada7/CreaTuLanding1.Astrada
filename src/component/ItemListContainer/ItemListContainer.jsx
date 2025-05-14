import './ItemListContainer.css';

function ItemListContainer({greetings}){
  return(
    <div className="item-list-container">
      <p>{greetings}</p>
    </div>
  );
};

export default ItemListContainer;