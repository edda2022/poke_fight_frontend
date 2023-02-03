import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function SortDropdown({ sortA, sortB }) {
  return (
    <div>
      <div>
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle
            className="btn btn-secondary btn-outline-warning"
            id="dropdown-autoclose-true"
          >
            Sort
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={sortA} href="#">
              A-Z
            </Dropdown.Item>
            <Dropdown.Item onClick={sortB} href="#">
              Z-A
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
