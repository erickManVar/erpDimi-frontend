import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContractors } from '../store/contractorSlice';

const ContractorList = ({ projectId, onSelectContractor }) => {
  const dispatch = useDispatch();
  const contractors = useSelector((state) => state.contractors.contractors);
  const contractorStatus = useSelector((state) => state.contractors.status);

  useEffect(() => {
    if (contractorStatus === 'idle') {
      dispatch(fetchContractors(projectId));
    }
  }, [contractorStatus, dispatch, projectId]);

  return (
    <div>
      <h2>Contractors</h2>
      <button onClick={() => onSelectContractor(null)}>Add Contractor</button>
      <ul>
        {contractors.map((contractor) => (
          <li key={contractor.id}>
            <button onClick={() => onSelectContractor(contractor.id)}>{contractor.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContractorList;
