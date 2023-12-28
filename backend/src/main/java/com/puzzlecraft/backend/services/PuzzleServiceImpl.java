package com.puzzlecraft.backend.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.puzzlecraft.backend.dtos.PuzzleResponse;

@Service
public class PuzzleServiceImpl implements PuzzleService {
    private PuzzleResponse currentPuzzle;

    @Override
    public void setCurrentPuzzle(PuzzleResponse puzzleResponse) {
        this.currentPuzzle = puzzleResponse;
    }

    @Override
    public Optional<PuzzleResponse> getCurrentPuzzle() {
        return Optional.ofNullable(currentPuzzle);
    }
}
