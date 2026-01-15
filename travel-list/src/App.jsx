import { useState } from "react";
import { Form } from "./components/form";
import { Logo } from "./components/logo";
import { PackingList } from "./components/packingList";
import { Stats } from "./components/stat";
function App() {
  const [items, setItems] = useState([]);
  
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        } else {
          return item;
        }
      })
    );
  }
  function handleDeleteItem(id) {
    setItems(items=>items.filter(item=>item.id !== id));
  }
  return (
    <>
      <Logo></Logo>
      <Form onAddItem={handleAddItem}></Form>
      <PackingList items={items} onToggleItem={handleToggleItem} onDeleteItem={handleDeleteItem}></PackingList>
      <Stats items={items}></Stats>
    </>
  );
}
export default App;
