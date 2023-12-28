package com.puzzlecraft.backend.services;

import com.puzzlecraft.backend.dtos.PuzzleResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class PuzzleServiceImplTest {

    @Autowired
    private PuzzleServiceImpl puzzleService;

    @Test
    void whenSettingAndGettingPuzzle_thenCorrectPuzzleIsReturned() {
        PuzzleResponse expectedPuzzle = new PuzzleResponse();
        puzzleService.setCurrentPuzzle(expectedPuzzle);

        Optional<PuzzleResponse> actualPuzzle = puzzleService.getCurrentPuzzle();

        assertTrue(actualPuzzle.isPresent(), "Puzzle should be present");
        assertEquals(expectedPuzzle, actualPuzzle.get(), "The returned puzzle should match the set puzzle");
    }

    @Test
    void whenSettingPuzzleToNull_thenGettingPuzzleReturnsEmptyOptional() {
        puzzleService.setCurrentPuzzle(null);

        Optional<PuzzleResponse> actualPuzzle = puzzleService.getCurrentPuzzle();

        assertFalse(actualPuzzle.isPresent(), "Puzzle should not be present when set to null");
    }
}
