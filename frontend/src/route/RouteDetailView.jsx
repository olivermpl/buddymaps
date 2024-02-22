import React, { useEffect } from 'react';

function RouteDetailView(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div>
      RouteDetailView
      <ul>
        <li>Id: {props._id}</li>
        <li>Owner: {props.owner}</li>
        <li>
          Path:
          {props.path.map((p) => {
            return (
              <p key={p.name}>
                {p.name}
                {p.order}
                {p.coordinates}
              </p>
            );
          })}
        </li>
      </ul>
    </div>
  );
}

export default RouteDetailView;
