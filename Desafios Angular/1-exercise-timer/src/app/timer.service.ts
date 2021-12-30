import { Injectable } from "@angular/core";
import { Exercise } from './exercise';

@Injectable({
    providedIn: 'root'
})

export class TimerService {

    exercisesArray: Exercise[] = [{
        name: 'Abdominal',
        duration: 30,
        repetitions: 3,
        preparation: 15,
        rest: 20
    }];
    currentEx: number;
    currentRep: number;
    phase: number;
    timeLeft: number;

    restart() {
        this.currentEx = 0;
        this.currentRep = 0;
        this.phase = 0;
        this.timeLeft = this.getTimeOfCurrentPhase()
    }

    next() {
        if (this.phase < 2) {
            this.phase++
        } else {
            const ex = this.exercisesArray[this.currentEx]
            if (this.currentRep < ex.repetitions - 1) {
                this.currentRep++
                this.phase = 1
            } else {
                if (this.currentEx < this.exercisesArray.length - 1) {
                    this.currentEx++
                    this.currentRep = 0
                    this.phase = 0
                } else {
                    return;
                    // faz nada, pois estamos no final do último exercício
                }
            }
        }
        this.timeLeft = this.getTimeOfCurrentPhase()
    }

    decrementTimeLeft(ellapsedTimeMs: any) {
        if (ellapsedTimeMs >= this.timeLeft) {
            this.next()
        } else {
            this.timeLeft = this.timeLeft - ellapsedTimeMs
        }
    }

    private getTimeOfCurrentPhase() {
        const ex = this.exercisesArray[this.currentEx]
        switch (this.phase) {
            case 0: return ex.preparation * 1000;
            case 1: return ex.duration * 1000;
            case 2: return ex.rest * 1000;
            default: return 0
        }
    }

    add(exercise: Exercise) {
        this.exercisesArray.push(exercise);
        // criando um novo objeto exercise com os mesmos campos do objeto original, só mudando o name pra vazio
    }

    delete(i: number) {
        this.exercisesArray.splice(i, 1)
    }
}