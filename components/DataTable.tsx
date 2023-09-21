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
            { data.map((item, index) => (
              <tr
                key={`${item.id}-${index}`}
                className="bg-orange-300 flex flex-col flex-nowrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
              >
                { headers.map(header => (
                    <th key={header.value} className="p-3 text-left">{header.text}</th>
                  )
                )}
                {
                  (handleEdit || handleDelete) &&
                  <th className="p-3 text-left" style={{ width: "150px" }}>Actions</th>
                }
              </tr>
              )
            )}
          </thead>
          <tbody className="flex-1 sm:flex-none">
            { data.map(item => (
                <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0" key={item.id}>
                  { headers.map(header => (
                      <td className="border-grey-light border hover:bg-gray-100 p-3" key={header.value}>{item[header.value]}</td>
                    )
                  )}
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    { handleEdit && ( <button onClick={() => handleEdit(item)}>Edit</button> ) }
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">Delete</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DataTable;
