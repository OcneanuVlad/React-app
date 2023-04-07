import Search from "./components/search/search";

function App() {

  function handleOnSearchChange(searchData: object) {
    console.log(searchData);
  }

  return (
    <div className='max-w-screen-lg my-10 mx-auto'>
      <Search onSearchChange={handleOnSearchChange} />
    </div>
  );  
}

export default App;