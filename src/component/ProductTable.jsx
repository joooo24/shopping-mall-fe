import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { currencyFormat } from "../utils/number";

const ProductTable = ({ header, data, deleteItem, openEditForm }) => {
    return (
        <div className="overflow-x">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {header.map((title, index) => (
                            <th key={index}>{title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item.sku}</td>
                                <td style={{ minWidth: "100px" }}>{item.name}</td>
                                <td>{currencyFormat(item.price)}</td>
                                <td>
                                    {Object.keys(item.stock).map((option, index) => (
                                        <div key={index}>
                                            {option}:{item.stock[option]}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <img src={item.image} width={100} alt="image" />
                                </td>
                                <td>{item.status}</td>
                                <td style={{ minWidth: "100px" }}>
                                    <Button
                                        option="sm"
                                        variant="danger"
                                        onClick={() => deleteItem(item._id)}
                                        className="mr-1">
                                        Delete
                                    </Button>
                                    <Button option="sm" onClick={() => openEditForm(item)}>
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={header.length}>No Data to show</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};
export default ProductTable;
