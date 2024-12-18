import React from 'react';

const Plan = (props) => {
  return (
    <div className="d-flex align-items-center justify-content-between my-3">
      <li className="shadow flex-grow-1 p-3 mx-2">{props.value}</li>
      <button
        className="btn btn-danger"
        onClick={() => {
          props.sendData(props.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Plan;
