import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  Heading,
  Input,
  Button
} from "@chakra-ui/react";

import CreateFormModal from './Modals/Create-Form';

interface Product {
  title: string;
  description: string;
  price: number;
  available: boolean;
}

function ProductsForm() {
  const [products, setProducts] = useState<Product[]>([]);
  
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState(''); 
  const [price, setPrice] = useState(0);  
  const [available, setAvailable] = useState(false);
  
  const [editIndex, setEditIndex] = useState<number | null>(null); 
  const [editedDescription, setEditedDescription] = useState('');

  const handleEditProduct = (index: number) => {
    const updatedProducts = [...products]; 
    updatedProducts[index].description = editedDescription; 
    setProducts(updatedProducts); 
  };

  const handleRegisterProduct = () => {
    if (productName.trim() !== '' && description.trim() !== '') {
      const newProduct = { title: productName, description, price, available };
      setProducts([...products, newProduct]);
      
      setProductName('');
      setDescription('');
      setPrice(0);
      setAvailable(false);
    }
  };

  const deleteProducts = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const sortedProducts = [...products].sort((a, b) => a.price - b.price);

  return (
    <>
      <Flex direction="column" align="center">
        <Box className='body' w='80%' m={3} p={5} border='2px' borderColor='gray.200'>
          <Box className='form-header' w='100%' m={3} p={5} border='1px' borderColor='gray.200'>
            <Flex direction='row' align='center' justify='space-between'>
              <Box className='add-product-title'>
                <Heading>Listagem de Produtos</Heading>
              </Box>

              <CreateFormModal
                productName={productName}
                setProductName={setProductName}
                description={description}
                setDescription={setDescription}
                price={price}
                setPrice={setPrice}
                available={available}
                setAvailable={setAvailable}
                handleRegisterProduct={handleRegisterProduct}
              />
            </Flex>
          </Box>  

          <Box className='Products' m={3} w='100%'>
            {sortedProducts.map((product, index) => (
              <Flex key={index} mt='5px' direction='row' justifyContent='space-between' w='100%' p={3} shadow='md' borderWidth='1px'> 
                <Flex className="product-text" direction='column' maxWidth="75%">
                  <Heading size='md' my={2}>{product.title}</Heading>
                  {editIndex === index ? (
                    <Input
                      value={editedDescription}
                      placeholder='Edit description'
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    <>
                      <Text>{product.description}</Text>
                      <Text color="gray.500" fontSize="sm">Valor: R${product.price.toFixed(2)}</Text>
                    </>
                  )}
                </Flex>

                <Box className='product-buttons'>
                  {editIndex === index ? 
                    <Button 
                      colorScheme='twitter' 
                      variant='solid' 
                      m={2}
                      onClick={() => {
                        setEditIndex(null);
                        handleEditProduct(index);
                      }}
                    >
                      Save
                    </Button>
                    :
                    <Button 
                      colorScheme='twitter' 
                      variant='solid' 
                      m={2}
                      onClick={() => {
                        setEditIndex(index);
                        setEditedDescription(product.description);
                      }}
                    >
                      Edit
                    </Button>
                  }

                  <Button 
                    colorScheme='red' 
                    variant='solid' 
                    m={2}
                    onClick={() => {
                      if(editIndex !== index) deleteProducts(index)
                      else setEditIndex(null);
                    }}
                  >
                    {editIndex === index ? 'Cancel' : 'Delete' } 
                  </Button>
                </Box>
              </Flex>
            ))}
          </Box>
        </Box>
      </Flex> 
    </>
  );
}

export default ProductsForm;
