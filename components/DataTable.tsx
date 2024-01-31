interface IDataTable {
  headers: Array<any>;
  data: Array<any>;
  handleDelete?: (item: any) => void;
  handleEdit?: (id: string) => void;
  handleApprove?: (item: any) => void;
}

const DataTable = ({ headers, data, handleDelete, handleEdit, handleApprove }: IDataTable) => {
  return (
    <section className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase text-white">
          <tr className="bg-orange-300 table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            { headers.map((header, index) => (
                <th
                  key={`${header.value}-${index}`}
                  style={{ width: header.width ? header.width : "230px" }}
                  className="px-6 py-3"
                  scope="col"
                >
                  {header.text}
                </th>
              )
            )}
            {
              (handleEdit || handleDelete || handleApprove) &&
              <th
                className="px-6 py-3"
                style={{ width: "150px" }}
              >
                Actions
              </th>
            }
          </tr>
        </thead>
        <tbody>
        { data.map((item, index) => (
            <tr className="bg-white border-b hover:bg-gray-100" key={`${index}-${item._id}`}>
              { headers.map((header, index) => (
                  <td
                    className="px-6 py-4"
                    key={`${index}-${header.value}`}
                  >
                    {item[header.value]}
                  </td>
                )
              )}
              {
                (handleEdit || handleDelete || handleApprove) &&
                <td className="px-6 py-4">
                  { handleEdit &&
                    ( <span
                      className="font-inter text-sm cursor-pointer mr-4 text-gray-400 hover:text-gray-600 font-medium"
                      onClick={() => handleEdit(item._id)}
                    >
                      Edit
                    </span> )
                  }
                  { handleApprove &&
                    ( <span
                      className="font-inter text-sm cursor-pointer mr-4 text-green-600 hover:text-green-800 font-medium"
                      onClick={() => handleApprove(item)}
                    >
                      Approve
                    </span> )
                  }
                  { handleDelete &&
                    ( <span
                      className="font-inter text-sm cursor-pointer text-red-400 hover:text-red-600 font-medium"
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
    </section>
  );
};

export default DataTable;
