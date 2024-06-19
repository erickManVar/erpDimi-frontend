import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSuppliers } from '../store/supplierSlice';

const SupplierList = ({ onSelectSupplier }) => {
  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers.suppliers);
  const supplierStatus = useSelector((state) => state.suppliers.status);

  useEffect(() => {
    if (supplierStatus === 'idle') {
      dispatch(fetchSuppliers());
    }
  }, [supplierStatus, dispatch]);

  return (
    <div>
      <h2>Suppliers</h2>
      <button onClick={() => onSelectSupplier(null)}>Add Supplier</button>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            <button onClick={() => onSelectSupplier(supplier.id)}>{supplier.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
