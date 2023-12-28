package com.puzzlecraft.backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.puzzlecraft.backend.dtos.PuzzleResponse;

@Service
public interface PuzzleService {
    public void setCurrentPuzzle(PuzzleResponse puzzleResponse);

    public Optional<PuzzleResponse> getCurrentPuzzle();
}
