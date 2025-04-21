'use client'
import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Upload,
  Checkbox,
} from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { ChevronRight, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FroalaEditorComponent from 'react-froala-wysiwyg';

const variationTypes = ['Color', 'Size', 'Material'];
const categories = ['Watch', 'Phone', 'Laptop'];
const tags = ['Watch', 'Gadget', 'Tech', 'Wearable', 'Smart'];
const productStatus = ['Published', 'Draft', 'Archived']; // Define product statuses

const AddEditProduct = ({ pageType, id }) => {
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Watch');
  const [selectedTags, setSelectedTags] = useState(['Watch', 'Gadget']);
  const [selectedProductStatus, setSelectedProductStatus] = useState('')
  const [fileList, setFileList] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [selectedTax, setSelectedTax] = useState(null);
  const [variants, setVariants] = useState([
    { id: Date.now(), type: 'Color', value: '' },
  ]);
  const [basePrice, setBasePrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [vatAmount, setVatAmount] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [form] = Form.useForm();

  const options = {
    toolbarButtons: ['bold', 'italic', 'underline', 'alignRight', 'alignCenter', 'alignLeft', 'outdent', 'indent', 'undo', 'redo', 'clearFormatting', 'selectAll'],
    pluginsEnabled: ['align', 'charCounter'],
    charCounterMax: 140
  }


  const handleUploadChange = (info) => {
    setFileList(info.fileList);
  };

  const handleDiscountChange = (value) => {
    setSelectedDiscount(value);
  };

  const handleTaxChange = (value) => {
    setSelectedTax(value);
  };

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), type: 'Color', value: '' },
    ]);
  };

  const deleteVariant = (id) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVariant = (id, key, newValue) => {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, [key]: newValue } : v
      )
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const removeTag = (tag) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };


  const handleEditorChange = (content) => {
    setDescription(content);
  };


  const Label = ({ label, className }) => {
    return (
      <p className={` ${className} text-sm text-gray-500 !mb-1`}>{label}</p>
    )
  }

  const handleSubmit = () => {
    let obj = {
      productName: productName,
      description: description,
      productCategory: selectedCategory,
      productTags: selectedTags,
      productStatus: selectedProductStatus,
      photos: fileList,
      basePrice: basePrice,
      discountType: selectedDiscount,
      discountPercentage: discountPercentage,
      taxClass: selectedTax,
      vatAmount: vatAmount,
      variants: variants,
      weight: weight,
      height: height,
      length: length,
      width: width,
    }
    console.log('obj----------', obj);
  }

  const handleClear = () => {
    setProductName('');
    setDescription('');
    setSelectedCategory('Watch');
    setSelectedTags([]);
    setSelectedProductStatus('')
    setFileList([]);
    setSelectedDiscount(null);
    setSelectedTax(null);
    setVariants([
      { id: Date.now(), type: 'Color', value: '' },
    ]);
    setBasePrice('');
    setDiscountPercentage('');
    setVatAmount('');
    setWeight('');
    setHeight('');
    setLength('');
    setWidth('');
  }

  return (
    <div style={{ padding: 24 }}>
      <div className="flex items-end justify-between sm:mb-4 mb-2.5">
        <div className="">
          <h1 className="md:!text-2xl !text-xl !font-semibold text-gray-900 !mb-0">{pageType == 'add' ? 'Add' : 'Edit'} Product</h1>
          <div className="flex items-center text-sm !font-medium mt-1">
            <button className="!text-blue-600 cursor-pointer" onClick={() => router.push('/')}>Dashboard</button>
            {/* <a href="/dashboard" className="text-blue-600 hover:underline">{pathname}</a> */}
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <button className="!text-blue-600 cursor-pointer" onClick={() => router.push('/product')}>Product</button>
            <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            <span className="text-gray-500 cursor-pointer">{pageType == 'add' ? 'Add' : 'Edit'} Product</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              if (pageType == 'add') {
                handleClear()
              }
            }}
            className="flex gap-2 items-center !text-gray-400 !text-sm !font-medium px-4 h-[40px] rounded-md border border-gray-400">
            {pageType != 'add' && <X className="w-4 h-4" />}
            {pageType == 'add' ? 'Clear' : 'Cancel'}
          </button>

          <button
            onClick={() => {
              if (pageType == 'add') {
                handleSubmit()
              }
            }}
            className="inline-flex items-center gap-2 px-4 h-[40px] !text-sm !font-medium !text-white bg-blue-600 rounded-md hover:bg-blue-700 transition">
            {pageType == 'add' ?
              <Plus size={16} color="#fff" />
              :
              <Image src={"/svgs/disk.svg"} height={14} width={14} alt="" />
            }
            {pageType == 'add' ? 'Add' : 'Save'} Product
          </button>
        </div>
      </div>

      <div className="flex flex-col md:gap-4 gap-2.5">
        <div className="md:flex block md:gap-4 gap-2.5">
          <div className="md:w-[70%] w-full flex flex-col gap-[14px] bg-white rounded-xl sm:p-6 p-4 md:mb-4 mb-2.5">
            <h1 className="text-[16px] !font-semibold text-gray-900">General Information</h1>
            <div className="w-full">
              <Label label={'Product Name'} />
              <Input placeholder="Enter product name"
                className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                value={productName}
                onChange={(e) => setProductName(e.currentTarget.value)}
              />
            </div>
            <div className="w-full">
              <Label label={'Description'} />
              <div>
                <FroalaEditorComponent
                  tag="textarea"
                  model={description}
                  onModelChange={handleEditorChange}
                  config={options}
                // className="!border-amber-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:w-[30%] w-full md:gap-4 gap-2.5">
            <div className="w-full">
              <div className="w-full p-6 bg-white rounded-xl space-y-4">
                <h1 className="text-[16px] !font-semibold text-gray-900">Category</h1>

                <div>
                  <Label label={'Product Category'} />
                  <div className="w-full border-gray-300 !bg-gray-50">
                    <Select placeholder="Select Discount"
                      value={selectedCategory}
                      style={{ height: '36px' }} className="w-full !border-gray-300 !bg-gray-50"
                      onChange={(value) => setSelectedCategory(value)}
                    >
                      {categories.map((cat, i) => (
                        <Select.Option key={i} value={cat}>{cat}</Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>

                <div>
                  <Label label={'Product Tags'} />
                  <div className="flex flex-wrap gap-2 bg-gray-50 border border-gray-300 rounded-lg px-2 py-1 min-h-[40px]">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-blue-400 hover:text-blue-600"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}

                    <div className="w-full border-gray-300 !bg-gray-50">
                      <Select placeholder="Select Discount"
                        value={""}
                        style={{ height: '36px' }} className="w-full !border-gray-300 !bg-gray-50"
                        onChange={(value) => toggleTag(value)}
                      >
                        <Select.Option value={''}>Select tag</Select.Option>
                        {tags
                          .filter((t) => !selectedTags.includes(t))
                          .map((tag, i) => (
                            <Select.Option key={i} value={tag}>{tag}</Select.Option>
                          ))}
                      </Select>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------------------------------ */}
            <div className="w-full bg-white rounded-2xl">
              <div className="w-full p-6 bg-white rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-[16px] !font-semibold text-gray-900 !mb-0">Status</h1>
                  <div
                    className="flex flex-col items-center justify-center bg-green-50 !text-green-600 !text-xs !font-medium px-4 h-[30px] rounded-md cursor-pointer">
                    Published
                  </div>
                </div>
                <div>
                  <Label label={'Product Status'} />
                  <div className="w-full border-gray-300 !bg-gray-50">
                    <Select placeholder="Product Status"
                      value={selectedProductStatus}
                      style={{ height: '36px' }} className="w-full !border-gray-300 !bg-gray-50"
                      onChange={(value) => setSelectedProductStatus(value)}
                    >
                      {productStatus.map((st, i) => (
                        <Select.Option key={i} value={st}>{st}</Select.Option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[70%] w-full flex flex-col gap-[14px] bg-white rounded-xl sm:p-6 p-4">
          <h1 className="text-[16px] !font-semibold text-gray-900 !mb-0">Media</h1>
          <div className="w-full">
            <Label label={'Photo'} />
            <Upload.Dragger multiple listType="picture-card" showUploadList
              onChange={handleUploadChange}
            >
              <p className="ant-upload-drag-icon">
                <PlusOutlined />
              </p>
              <p className="text-gray-400">Drag and drop image here, or click add image</p>
              <button
                className=" items-center bg-cyan-50 !text-cyan-600 !text-sm !font-medium px-4 h-[40px] rounded-md cursor-pointer">
                Add Image
              </button>
            </Upload.Dragger>
          </div>
        </div>
        <div className="md:w-[70%] w-full flex flex-col gap-[14px] bg-white rounded-xl sm:p-6 p-4">
          <h1 className="text-[16px] !font-semibold text-gray-900 !mb-0">Pricing</h1>
          <div className="w-full">
            <Label label={'Base Price'} />
            <Input placeholder="0.00" prefix="$"
              className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
              value={basePrice}
              onChange={(e) => setBasePrice(e.currentTarget.value)}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <Label label={'Discount Type'} />
              <div className="w-full border-gray-300 !bg-gray-50">
                <Select placeholder="Select Discount" style={{ height: '36px' }} className="w-full !border-gray-300 !bg-gray-50"
                  onChange={handleDiscountChange}
                >
                  <Select.Option value="No Discount">No Discount</Select.Option>
                  <Select.Option value="Discount">Discount</Select.Option>
                </Select>
              </div>
            </div>
            <div className="w-full">
              <Label label={'Discount Precentage (%)'} />
              <Input placeholder="0"
                className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.currentTarget.value)}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <Label label={'Tax Class'} />
              <div className="w-full">
                <Select placeholder="Select Tax" style={{ height: '36px' }} className="w-full border-gray-300 bg-gray-50"
                  onChange={handleTaxChange}
                >
                  <Select.Option value="Tax Free">Tax Free</Select.Option>
                  <Select.Option value="Tax Paid">Tax Paid</Select.Option>
                </Select>
              </div>
            </div>
            <div className="w-full">
              <Label label={'VAT Amount (%)'} />
              <Input placeholder="0"
                className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                value={vatAmount}
                onChange={(e) => setVatAmount(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        <div className="md:w-[70%] w-full flex flex-col gap-[14px] bg-white rounded-xl sm:p-6 p-4">
          <h1 className="text-[16px] !font-semibold text-gray-900 !mb-0">Pricing</h1>
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="flex items-end gap-4"
            >
              <div className="w-full">
                <Label label={'Variation Type'} />
                <Select placeholder={variant.type} style={{ height: '36px' }} className="w-full"
                  onChange={handleTaxChange}
                >
                  {variationTypes.map((type, i) => (
                    <Select.Option key={i} value={type}>{type}</Select.Option>
                  ))}
                </Select>
              </div>

              <div className="w-full">
                <Label label={'Variation'} />
                <Input placeholder="Enter product name"
                  value={variant.value}
                  className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                  onChange={(e) =>
                    updateVariant(variant.id, 'value', e.currentTarget.value)
                  }
                />
              </div>

              <div className="flex justify-end items-end">
                <button
                  onClick={() => deleteVariant(variant.id)}
                  className="flex flex-col w-[36px] h-[36px] justify-center items-center rounded-md bg-red-50 hover:bg-red-100 text-red-500"
                >
                  <Trash2 size={18} color="#EB3D4D" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addVariant}
            className="flex w-fit items-center bg-cyan-50 !text-cyan-600 !text-sm !font-medium px-4 h-[40px] rounded-md cursor-pointer">
            <Plus size={16} />
            Add Variant
          </button>
        </div>
        <div className="md:w-[70%] w-full flex flex-col gap-[14px] bg-white rounded-xl sm:p-6 p-4">
          <h1 className="text-[16px] !font-semibold text-gray-900 !mb-0">Pricing</h1>

          <Checkbox
            checked={true}
            // onChange={() => { }}
            className="!text-cyan-600"
          >
            This is a physical product
          </Checkbox>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
            <div className="w-full">
              <Label label={'Weight'} />
              <Input placeholder="Enter weight"
                className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                value={weight}
                onChange={(e) => setWeight(e.currentTarget.value)}
              />
            </div>
            <div className="w-full">
              <Label label={'Height'} />
              <Input placeholder="Enter height"
                className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                value={height}
                onChange={(e) => setHeight(e.currentTarget.value)}
              />
            </div>
            <div className="w-full">
              <Label label={'Length'} />
              <Input placeholder="Enter length"
                className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                value={length}
                onChange={(e) => setLength(e.currentTarget.value)}
              />
            </div>
            <div className="w-full">
              <Label label={'Width'} />
              <Input placeholder="Enter weight"
                className="w-full !bg-gray-50 !text-sm border border-gray-100 h-[36px] rounded-sm px-3"
                value={width}
                onChange={(e) => setWidth(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AddEditProduct;
