package com.puzzlecraft.backend.services;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ImageProcessingImplTest {

    @InjectMocks
    private ImageProcessingServiceImpl imageProcessingService;

    @Mock
    private BufferedImage mockImage;

    @Test
    void whenCalculatingPiecesHorizontal_thenCorrectValueIsReturned() {
        // Arrange
        when(mockImage.getWidth()).thenReturn(400);
        when(mockImage.getHeight()).thenReturn(300);
        int totalPieces = 100;

        // Act
        int piecesHorizontal = imageProcessingService.getPiecesHorizontal(mockImage, totalPieces);

        // Assert
        assertTrue(piecesHorizontal > 0, "Pieces horizontal should be greater than 0");
    }

    @Test
    void whenCalculatingPiecesVertical_thenCorrectValueIsReturned() {
        int totalPieces = 100;
        int piecesHorizontal = 10;

        int piecesVertical = imageProcessingService.getPiecesVertical(totalPieces, piecesHorizontal);

        assertEquals(10, piecesVertical, "Pieces vertical should be equal to totalPieces divided by piecesHorizontal");
    }

    @Test
    void whenProcessingImage_thenCorrectNumberOfPiecesIsCreated() {
        when(mockImage.getWidth()).thenReturn(400);
        when(mockImage.getHeight()).thenReturn(300);

        List<BufferedImage> pieces = imageProcessingService.processImage(mockImage, 4, 3, 12);

        assertEquals(12, pieces.size(), "Should create 12 puzzle pieces");
    }

    @Test
    void whenSavingOriginalImage_thenUrlIsNotNull() throws IOException {
        BufferedImage realImage = ImageIO.read(new File("src/test/java/com/puzzlecraft/backend/static/test.png"));

        String url = imageProcessingService.saveOriginalImageAndGetUrl(realImage, "test.png");

        assertNotNull(url, "The URL should not be null");
    }

    @Test
    void whenSavingFiles_thenUrlsAreCreated() throws IOException {
        BufferedImage realImage = ImageIO.read(new File("src/test/java/com/puzzlecraft/backend/static/test.png"));
        List<BufferedImage> pieces = new ArrayList<>();
        pieces.add(realImage);
        pieces.add(realImage);

        List<String> urls = imageProcessingService.saveFilesAndGetUrls(pieces, "test.png");

        assertEquals(2, urls.size(), "Should create URLs for 2 puzzle pieces");
    }
}
