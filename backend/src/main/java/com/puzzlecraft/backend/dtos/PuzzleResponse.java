package com.puzzlecraft.backend.dtos;

import java.util.List;

public class PuzzleResponse {
    private String originalImageUrl;
    private List<String> puzzlePieceUrls;
    private int piecesHorizontal;
    private int piecesVertical;

    public PuzzleResponse(String originalImageUrl, List<String> puzzlePieceUrls, int piecesHorizontal,
            int piecesVertical) {
        this.originalImageUrl = originalImageUrl;
        this.puzzlePieceUrls = puzzlePieceUrls;
        this.piecesHorizontal = piecesHorizontal;
        this.piecesVertical = piecesVertical;
    }

    public PuzzleResponse() {
    }

    public String getOriginalImageUrl() {
        return this.originalImageUrl;
    }

    public void setOriginalImageUrl(String originalImageUrl) {
        this.originalImageUrl = originalImageUrl;
    }

    public List<String> getPuzzlePieceUrls() {
        return this.puzzlePieceUrls;
    }

    public void setPuzzlePieceUrls(List<String> puzzlePieceUrls) {
        this.puzzlePieceUrls = puzzlePieceUrls;
    }

    public int getPiecesHorizontal() {
        return this.piecesHorizontal;
    }

    public void setPiecesHorizontal(int piecesHorizontal) {
        this.piecesHorizontal = piecesHorizontal;
    }

    public int getPiecesVertical() {
        return this.piecesVertical;
    }

    public void setPiecesVertical(int piecesVertical) {
        this.piecesVertical = piecesVertical;
    }

}