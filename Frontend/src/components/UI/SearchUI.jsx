import search from "../../assets/images/search.png";

function SearchUI() {
  return (
    <div className="pr-2">
      <form class="flex items-center mx-auto max-w-sm">
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <div class="absolute inset-y-0 flex items-center pointer-events-none ps-3 start-0">
            <img src={search} alt="search" />
          </div>
          <input
            type="text"
            id="simple-search"
            class="block bg-slate-300 p-2.5 rounded-lg w-full text-black text-sm ps-10 dark:placeholder-gray-400"
            placeholder="Search Messenger..."
            required
          />
        </div>
      </form>
    </div>
  );
}

export default SearchUI;
