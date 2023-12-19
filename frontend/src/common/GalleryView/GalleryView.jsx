import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./GalleryView.css";
import { bringTattoo } from "../../services/apiCalls";
import { FlipCardData } from "../FlipCardData/FlipCardData";

export const GalleryView = () => {
  const [tattooData, setTattooData] = useState([]);

  useEffect(() => {
    const fetchTattooData = async () => {
      try {
        const response = await bringTattoo();
        setTattooData(response.data.data);
      } catch (error) {
        console.error("Error fetching tattoo data:", error);
      }
    };

    fetchTattooData();
  }, []);

  return (
    <Container className="d-flex">
      <Row className="gallery-container mb-20">
        {tattooData.map((tattoo, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <FlipCardData
              photo={tattoo.photo}
              name={tattoo.name}
              description={tattoo.description}
              price={tattoo.price}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
