package com.puzzlecraft.backend.services;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

public interface ImageProcessingService {
    List<BufferedImage> processImage(BufferedImage image, int width, int height, int pieces) throws IOException;

    List<String> saveFilesAndGetUrls(List<BufferedImage> puzzlePieces, String originalFilename) throws IOException;

    public int getPiecesVertical(int totalPieces, int piecesHorizontal) throws IOException;

    public int getPiecesHorizontal(BufferedImage image, int totalPieces) throws IOException;

    String saveOriginalImageAndGetUrl(BufferedImage image, String originalFilename) throws IOException;
}
