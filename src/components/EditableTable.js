import React, { useState } from 'react';

const EditableTable = ({ data, columns, onSave }) => {
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({});

  const startEdit = (row) => {
    setEditing(row.id);
    setFormData(row);
  };

  const handleChange = (e, column) => {
    setFormData({
      ...formData,
      [column]: e.target.value,
    });
  };

  const saveEdit = () => {
    onSave(formData);
    setEditing(null);
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col}>{col}</th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col}>
                {editing === row.id ? (
                  <input
                    type="text"
                    value={formData[col]}
                    onChange={(e) => handleChange(e, col)}
                  />
                ) : (
                  row[col]
                )}
              </td>
            ))}
            <td>
              {editing === row.id ? (
                <button onClick={saveEdit}>Save</button>
              ) : (
                <button onClick={() => startEdit(row)}>Edit</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
