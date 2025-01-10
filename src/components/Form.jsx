const Form = () => {
  return (
    <form>
      <div className="pb-4">
        <label className="block font-medium text-sm text-gray-700" htmlFor="sign">
          <span>Позиція:</span>
        </label>
        <input
          className="border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm pl-2 text-lg mt-1 block w-full"
          id="sign"
          type="text"
        />
      </div>
      <div className="pb-4">
        <label
          className="block font-medium text-sm text-gray-700 dark:text-gray-300"
          htmlFor="target"
        >
          <span>Ціль:</span>
        </label>
        <div className="grid grid-cols-2">
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="КР (Крилата Ракета)"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              КР (Крилата Ракета)
            </span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="ЛМ (Літак Малий)"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">ЛМ (Літак Малий)</span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="Б (БПЛА)"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Б (БПЛА)</span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="Г (Гелікоптер)"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Г (Гелікоптер)</span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="К (Квадрокоптер)"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">К (Квадрокоптер)</span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="ЛВ (Літак Великий)"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              ЛВ (Літак Великий)
            </span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="Постріли"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Постріли</span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="З (Зонд)"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">З (Зонд)</span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="Вибухи"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Вибухи</span>
          </label>
          <label className="flex items-center py-1">
            <input
              type="radio"
              className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
              name="target"
              value="Виходи"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Виходи</span>
          </label>
        </div>
      </div>
    </form>
  );
};

export default Form;
