package com.carefirst.backend.util;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalTime;
import java.util.List;
import org.junit.jupiter.api.Test;

class SlotGeneratorTest {

    @Test
    void morningBlockGivesSixSlots() {
        List<LocalTime> slots = SlotGenerator.generate(LocalTime.of(9, 0), LocalTime.of(12, 0), 30);

        assertEquals(6, slots.size());
        assertEquals(LocalTime.of(9, 0), slots.get(0));
        assertEquals(LocalTime.of(11, 30), slots.get(5));
    }

    @Test
    void afternoonBlockGivesEightSlots() {
        List<LocalTime> slots = SlotGenerator.generate(LocalTime.of(14, 0), LocalTime.of(18, 0), 30);

        assertEquals(8, slots.size());
        assertEquals(LocalTime.of(17, 30), slots.get(7));
    }

    @Test
    void leftoverTimeShorterThanOneSlotIsDropped() {
        List<LocalTime> slots = SlotGenerator.generate(LocalTime.of(9, 0), LocalTime.of(10, 20), 30);

        assertEquals(List.of(LocalTime.of(9, 0), LocalTime.of(9, 30)), slots);
    }

    @Test
    void blockShorterThanOneSlotGivesNothing() {
        List<LocalTime> slots = SlotGenerator.generate(LocalTime.of(9, 0), LocalTime.of(9, 20), 30);

        assertTrue(slots.isEmpty());
    }

    @Test
    void zeroSlotLengthIsRejected() {
        assertThrows(IllegalArgumentException.class,
                () -> SlotGenerator.generate(LocalTime.of(9, 0), LocalTime.of(12, 0), 0));
    }
}