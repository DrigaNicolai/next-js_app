interface IDataTable {
  headers: Array<any>;
  data: Array<any>;
  handleDelete?: (item: any) => void;
  handleEdit?: (item: any) => void;
}

const DataTable = ({ headers, data, handleDelete, handleEdit }: IDataTable) => {
  return (
    <section className="flex items-center justify-center">
      <div className="container">
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            <tr className="bg-orange-300 flex flex-col flex-nowrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
              { headers.map(header => (
                  <th key={header.value} className="p-3 text-left">{header.text}</th>
                )
              )}
            </tr>
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {/*<tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td className="border-grey-light border hover:bg-gray-100 p-3">John Covv</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">contato@johncovv.com</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
            </tr>
            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td className="border-grey-light border hover:bg-gray-100 p-3">Michael Jackson</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">m_jackson@mail.com</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
            </tr>
            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td className="border-grey-light border hover:bg-gray-100 p-3">Julia</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">julia@mail.com</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
            </tr>
            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
              <td className="border-grey-light border hover:bg-gray-100 p-3">Martin Madrazo</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">martin.madrazo@mail.com</td>
              <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
            </tr>*/}
            {/*{ data.map((item) => (
                <div key={item._id}>{item._id} - {item['username']}</div>
              )
            )}*/}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DataTable;
