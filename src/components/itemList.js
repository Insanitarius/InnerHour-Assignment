import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

function ItemList() {
  const textInput1 = useRef();
  const textInput2 = useRef();
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [list4, setList4] = useState([]);
  const [enable, setEnable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (list1.length !== 0 && list2.length !== 0) {
      let temp = list1.concat(list2);
      setList3(temp);
      temp = [...new Set([...list1, ...list2])];
      setList4(temp);
      setEnable(true);
      toast.dark("Computed Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Cannot compute empty list!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const validate = (value) => {
    if (value === "") {
      toast.error("Cannot add an empty value", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    if (value.length < 3) {
      toast.error("Item should have at least 3 characters", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }
    return true;
  };

  const listItem1 = (e) => {
    e.preventDefault();
    if (validate(textInput1.current.value)) {
      let temp = list1.concat(textInput1.current.value);
      setList1(temp);
    }
    textInput1.current.value = "";
  };

  const listItem2 = (e) => {
    e.preventDefault();
    if (validate(textInput2.current.value)) {
      let temp = list2.concat(textInput2.current.value);
      setList2(temp);
    }
    textInput2.current.value = "";
  };

  const removeItemFromList1 = (index) => {
    let newList = [...list1];
    newList.splice(index, 1);
    setList1(newList);
  };

  const removeItemFromList2 = (index) => {
    let newList = [...list2];
    newList.splice(index, 1);
    setList2(newList);
  };

  //   useEffect(() => {}, [list1]);

  return (
    <div className="container mt-2">
      <h1 className="mb-4">Item Lists</h1>
      <div className="row">
        <div className="col">
          {!enable ? (
            <>
              <h2> Add Items in list A</h2>
              <Form onSubmit={listItem1} className="mt-2">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Add a item to list"
                    name="player"
                    ref={textInput1}
                  />
                </Form.Group>
                <Button className="miami mt-1" variant="primary" type="submit">
                  Add to List A
                </Button>
              </Form>
            </>
          ) : null}

          {list1 && list1.length > 0 ? (
            <>
              {enable ? <h2>Items in list A</h2> : null}
              <hr />
              <div>
                <ul className="list-group">
                  {list1.map((item, i) => {
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-item-center list-group-item-action"
                      >
                        {item}{" "}
                        {enable ? null : (
                          <span
                            className="badge badge-danger"
                            onClick={() => removeItemFromList1(i)}
                          >
                            x
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : null}
        </div>
        <div className="col">
          {!enable ? (
            <>
              <h2> Add Items in list B</h2>

              <Form onSubmit={listItem2} className="mt-2">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Add a item to list"
                    name="player"
                    ref={textInput2}
                  />
                </Form.Group>
                <Button className="miami mt-1" variant="primary" type="submit">
                  Add to List B
                </Button>
              </Form>
            </>
          ) : null}
          {list2 && list2.length > 0 ? (
            <>
              {enable ? <h2>Items in list B</h2> : null}
              <hr />
              <div>
                <ul className="list-group">
                  {list2.map((item, i) => {
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-item-center list-group-item-action"
                      >
                        {item}{" "}
                        {enable ? null : (
                          <span
                            className="badge badge-danger"
                            onClick={() => removeItemFromList2(i)}
                          >
                            x
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="row">
        <div className="col mt-4">
          {list3 && list3.length > 0 ? (
            <>
              {enable ? <h2>All items in list A and B</h2> : null}
              <hr />
              <div>
                <ul className="list-group">
                  {list3.map((item, i) => {
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-item-center list-group-item-action"
                      >
                        {item}{" "}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : null}
        </div>
        <div className="col mt-4">
          {list4 && list4.length > 0 ? (
            <>
              {enable ? <h2>Unique list items</h2> : null}

              <hr />
              <div>
                <ul className="list-group">
                  {list4.map((item, i) => {
                    return (
                      <li
                        key={i}
                        className="list-group-item d-flex justify-content-between align-item-center list-group-item-action"
                      >
                        {item}{" "}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </>
          ) : null}
        </div>
      </div>
      {!enable ? (
        <Button
          className="action_button"
          variant="primary"
          onClick={handleSubmit}
        >
          Compute
        </Button>
      ) : null}
    </div>
  );
}

export default ItemList;
