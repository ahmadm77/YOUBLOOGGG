import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, SimpleGrid, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Pagination = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    fetchArticles();
  }, [currentPage]);

  const fetchArticles = async () => {
    try {
      const response = await fetch(
        `https://minpro-blog.purwadhikabootcamp.com/api/blog?page=${currentPage}`
      );
      const data = await response.json();
      setArticles(data.result);
      setTotalPages(data.page);
    } catch (error) {
      console.log(error);
    }
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleClick = (id) => {
    navigate(`/detailPage/${id}`)
  }
  const itemsPerRow = 4;

  return (
    <Box p={4} textAlign={"center"}>
      <Heading 
      mb={5}
      textAlign={"center"}
      borderRadius="full"
      as="h1"
      size="xl"
      color="white"
      bg="blue.700"
      fontWeight="bold"      
      >
        Blog list
      </Heading>
      {articles.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: itemsPerRow }} spacing={4}>
          {articles.map((article) => (
            <Box
            border={"2px"}
            borderWidth={"5px"}
            borderRadius="md"
            boxShadow="lg"
            onClick={()=>handleClick(article.id)} key={article.id} mb={4} p={4}>
              <Image  width={"200px"} height={"200px"}  src={`https://minpro-blog.purwadhikabootcamp.com/${article.imageURL}`}>
                </Image>
              <Heading as="h2" fontSize="xl" mb={2}>
                {article.title}
              </Heading>
            
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Text>Tidak ada artikel yang ditemukan.</Text>
      )}
      <Box mt={4} >
        {currentPage > 1 && (
          <Button onClick={goToPreviousPage} colorScheme="blue" mr={2}>
            Previous
          </Button>
        )}
        {currentPage < totalPages && (
          <Button onClick={goToNextPage} colorScheme="blue">
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};
