package com.puzzlecraft.backend.controllers;

import com.puzzlecraft.backend.dtos.PuzzleResponse;
import com.puzzlecraft.backend.services.ImageProcessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

import javax.imageio.ImageIO;

@RestController
@RequestMapping("/api/images")
@CrossOrigin
public class ImageUploadController {

        @Autowired
        private ImageProcessingService imageProcessingService;

        @PostMapping("/upload")
        public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile image,
                        @RequestParam("width") int width,
                        @RequestParam("height") int height,
                        @RequestParam("pieces") int pieces) {
                try {
                        BufferedImage originalImage = ImageIO.read(image.getInputStream());

                        String originalImageUrl = imageProcessingService.saveOriginalImageAndGetUrl(originalImage,
                                        image.getOriginalFilename());

                        List<BufferedImage> puzzlePieces = imageProcessingService.processImage(originalImage, width,
                                        height,
                                        pieces);
                        List<String> puzzlePieceUrls = imageProcessingService.saveFilesAndGetUrls(puzzlePieces,
                                        image.getOriginalFilename());

                        int piecesHorizontal = imageProcessingService.getPiecesHorizontal(originalImage, pieces);
                        int piecesVertical = imageProcessingService.getPiecesVertical(pieces, piecesHorizontal);

                        PuzzleResponse puzzleResponse = new PuzzleResponse();
                        puzzleResponse.setOriginalImageUrl(originalImageUrl);
                        puzzleResponse.setPuzzlePieceUrls(puzzlePieceUrls);
                        puzzleResponse.setPiecesHorizontal(piecesHorizontal);
                        puzzleResponse.setPiecesVertical(piecesVertical);

                        return new ResponseEntity<>(puzzleResponse, HttpStatus.ACCEPTED);
                } catch (IOException e) {
                        e.printStackTrace();
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                        .body("An error occurred while processing the image.");
                }
        }

}
