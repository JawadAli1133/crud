import React, { useState, useEffect } from "react";
import "./CSS/ProductPage.css";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Products = () => {
  const [showAddItemModal, setshowAddItemModal] = useState(false);
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [editProduct, seteditProduct] = useState(null);

  const handleOpenItemModel = () => {
    setshowAddItemModal(true);
  };
  const handleCloseItemModel = () => {
    setshowAddItemModal(false);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("email");
    toast.success("LogOut Successfully");
    navigate("/signin");
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const LoadData = async () => {
    try
    {
      const response = await fetch("https://crud-delta-six.vercel.app/products/allproducts", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setproducts(result);
    }
    catch(error)
    {
      toast.error("Internal Server Error");
    }
  };

  const onsubmit = async (data) => {
    setisLoading(true);
    const response = await fetch(
      "https://crud-delta-six.vercel.app/products/createproduct",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    if (result.success) {
      setisLoading(false);
      reset();
      toast.success("Product Added Successfully");
      setproducts((prevProducts) => [...prevProducts, result.product]);
    }
  };

  const handleDeleteClick = async (id) => {
    const response = await fetch(
      "https://crud-delta-six.vercel.app/products/deleteProduct",
      {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const result = await response.json();
    if (result.success) {
      setproducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      toast.success(result.message);
    }
  };

  const handleUpdateClick = async (product) => {
    reset();
    seteditProduct(product);
    setshowEditModal(true);
  };

  const onUpdateSubmit = async (data) => {
    const response = await fetch(
      `https://crud-delta-six.vercel.app/products/updateproduct/${editProduct._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    if (result.success) {
      setshowEditModal(false);
      // seteditProduct(null);
      // reset();
      toast.success("Product Updated Successfully");
      setproducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === editProduct._id ? { ...product, ...data } : product
        )
      );
    } else {
      console.log("error....");
    }
  };

  useEffect(() => {
    setproducts([]);
    // if (!localStorage.getItem("email")) {
    //   navigate("/signin");
    // }
    LoadData();
  }, []);

  return (
    <>
      <Navbar
        onAddProductClick={handleOpenItemModel}
        onLogoutClick={handleLogoutClick}
      />
      <div className="product-main">
        <div className="product-container">
          <div className="product-box">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((items) => {
                  return (
                    <tr key={items._id}>
                      <td>{items.productname}</td>
                      <td>Rs. {items.productprice}/-</td>
                      <td>{items.productdescription}</td>
                      <td>{items.productcategory}</td>
                      <td className="product-update">
                        <button onClick={() => handleUpdateClick(items)}>
                          Update
                        </button>
                      </td>
                      <td className="product-delete">
                        <button onClick={() => handleDeleteClick(items._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isitems={false}
        show={showAddItemModal}
        onClose={handleCloseItemModel}
        title="Add New Item"
      >
        {errors.productname && (
          <div className="msgs red">{errors.productname.message}</div>
        )}
        {errors.productprice && (
          <div className="msgs red">{errors.productprice.message}</div>
        )}
        {errors.productdescription && (
          <div className="msgs red">{errors.productdescription.message}</div>
        )}
        {errors.productcategory && (
          <div className="msgs red">{errors.productcategory.message}</div>
        )}

        <form onSubmit={handleSubmit(onsubmit)}>
          <input
            type="text"
            placeholder="Enter Name"
            {...register("productname", {
              required: { value: true, message: "Please Enter Product Name" },
            })}
          />
          <input
            type="number"
            placeholder="Enter Price"
            {...register("productprice", {
              required: { value: true, message: "Please Enter Price" },
            })}
          />
          <input
            type="text"
            placeholder="Enter Description"
            {...register("productdescription", {
              required: {
                value: true,
                message: "Please Enter Product Description",
              },
            })}
          />
          <input
            type="text"
            placeholder="Enter Category"
            {...register("productcategory", {
              required: {
                value: true,
                message: "Please Enter Product Category",
              },
            })}
          />
          <button type="submit">
            Add Product
            {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
          </button>
        </form>
      </Modal>

      <Modal
        show={showEditModal}
        onClose={() => setshowEditModal(false)}
        title="Edit Product"
      >
        <form onSubmit={handleSubmit(onUpdateSubmit)}>
          <input
            type="text"
            placeholder="Enter Name"
            defaultValue={editProduct?.productname}
            {...register("productname", {
              required: { value: true, message: "Please Enter Product Name" },
            })}
          />
          <input
            type="number"
            placeholder="Enter Price"
            defaultValue={editProduct?.productprice}
            {...register("productprice", {
              required: { value: true, message: "Please Enter Price" },
            })}
          />
          <input
            type="text"
            placeholder="Enter Description"
            defaultValue={editProduct?.productdescription}
            {...register("productdescription", {
              required: {
                value: true,
                message: "Please Enter Product Description",
              },
            })}
          />
          <input
            type="text"
            placeholder="Enter Category"
            defaultValue={editProduct?.productcategory}
            {...register("productcategory", {
              required: {
                value: true,
                message: "Please Enter Product Category",
              },
            })}
          />
          <button type="submit">Update Product</button>
        </form>
      </Modal>
    </>
  );
};

export default Products;