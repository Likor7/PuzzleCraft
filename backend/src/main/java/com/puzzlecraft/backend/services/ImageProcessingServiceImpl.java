package com.puzzlecraft.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class ImageProcessingServiceImpl implements ImageProcessingService {

    private static final String PUZZLE_DIRECTORY = "static/puzzles/";

    @Override
    public List<BufferedImage> processImage(BufferedImage image, int width, int height, int totalPieces) {
        List<BufferedImage> puzzlePieces = new ArrayList<>();

        int piecesHorizontal = getPiecesHorizontal(image, totalPieces);
        int piecesVertical = getPiecesVertical(totalPieces, piecesHorizontal);

        int pieceWidth = image.getWidth() / piecesHorizontal;
        int pieceHeight = image.getHeight() / piecesVertical;

        for (int y = 0; y < piecesVertical; y++) {
            for (int x = 0; x < piecesHorizontal; x++) {
                int pieceX = x * pieceWidth;
                int pieceY = y * pieceHeight;

                BufferedImage subImage = image.getSubimage(pieceX, pieceY, pieceWidth, pieceHeight);
                puzzlePieces.add(subImage);
            }
        }

        return puzzlePieces;
    }

    @Override
    public int getPiecesVertical(int totalPieces, int piecesHorizontal) {
        return totalPieces / piecesHorizontal;
    }

    @Override
    public int getPiecesHorizontal(BufferedImage image, int totalPieces) {
        double aspectRatio = (double) image.getWidth() / image.getHeight();

        int divisor = (int) Math.sqrt(totalPieces);
        while (totalPieces % divisor != 0) {
            divisor--;
        }
        int otherDivisor = totalPieces / divisor;

        if (Math.abs(aspectRatio - (double) divisor / otherDivisor) > Math
                .abs(aspectRatio - (double) otherDivisor / divisor)) {
            return otherDivisor;
        }
        return divisor;
    }

    @Override
    public String saveOriginalImageAndGetUrl(BufferedImage image, String originalFilename) throws IOException {
        File directory = new File(PUZZLE_DIRECTORY);
        if (!directory.exists()) {
            directory.mkdirs();
        } else {
            for (File file : directory.listFiles()) {
                file.delete();
            }
        }

        String originalFile = "originalPhoto.png";
        File outputFile = new File(directory, originalFile);
        ImageIO.write(image, "png", outputFile);

        return ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/" + PUZZLE_DIRECTORY)
                .path(originalFile)
                .toUriString();
    }

    @Override
    public List<String> saveFilesAndGetUrls(List<BufferedImage> puzzlePieces, String originalFilename)
            throws IOException {
        List<String> fileUrls = new ArrayList<>();
        File directory = new File(PUZZLE_DIRECTORY + "pieces/");
        if (!directory.exists()) {
            directory.mkdirs();
            for (File file : directory.listFiles()) {
                file.delete();
            }
        }

        for (int i = 0; i < puzzlePieces.size(); i++) {
            BufferedImage piece = puzzlePieces.get(i);
            String fileName = "puzzle_piece_" + UUID.randomUUID() + ".png";
            File outputFile = new File(directory, fileName);
            ImageIO.write(piece, "png", outputFile);
            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/" + PUZZLE_DIRECTORY + "pieces/")
                    .path(fileName)
                    .toUriString();
            fileUrls.add(fileUrl);
        }

        Collections.shuffle(fileUrls, new Random(Double.doubleToLongBits(Math.random())));

        return fileUrls;
    }

}
