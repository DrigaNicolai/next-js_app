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
                <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border-b-0" key={item.id}>
                  { headers.map(header => (
                      <td className="border-grey-light border hover:bg-gray-100 p-3" key={header.value}>{item[header.value]}</td>
                    )
                  )}
                  {
                    (handleEdit || handleDelete) &&
                    <td className="border-grey-light border p-3 border-b-0">
                      { handleEdit &&
                        ( <span
                          className="font-inter text-sm cursor-pointer mr-4 text-gray-400 hover:text-gray-600 hover:font-medium"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </span> )
                      }
                      { handleDelete &&
                        ( <span
                          className="font-inter text-sm cursor-pointer text-red-400 hover:text-red-600 hover:font-medium"
                          onClick={() => handleDelete(item)}
                        >
                          Delete
                        </span> )
                      }
                    </td>
                  }
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
