import { Car } from '../classes/car.js';
import { Drone } from '../classes/drone.js';
import { DataError } from './data-error.js';

export class FleetDataService {
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  getCarByLicense(license) {
    return this.cars.find(car => car.license === license);
  }

  getCarsSortedByLicense() {
    return this.cars.sort((carA, carB) => {
      if (carA.license < carB.license) {
        return -1;
      }
      if (carA.license > carB.license) {
        return 1;
      }
      return 0;
    });
  }

  filterCarsByMake(term) {
    return this.cars.filter(car => car.make.indexOf(term) >= 0);
  }

  loadData(fleet) {
    for (const data of fleet) {
      switch (data.type) {
        case 'car': {
          if (this.validateCarData(data)) {
            const car = this.loadCar(data);
            if (car) {
              this.cars.push(car);
            }
          } else {
            const e = new DataError('Invalid Car Data', data);
            this.errors.push(e);
          }
          break;
        }
        case 'drone': {
          if (this.validateDroneData(data)) {
            const drone = this.loadDrone(data);
            if (drone) {
              this.drones.push(drone);
            }
          } else {
            const e = new DataError('Invalid Drone Data', data);
            this.errors.push(e);
          }
          break;
        }
        default: {
          const e = new DataError('Invalid vehicle type', data);
          this.errors.push(e);
          break;
        }
      }
    }
  }

  loadCar(car) {
    try {
      const c = new Car(car.license, car.model, car.latLong);
      c.miles = car.miles;
      c.make = car.make;
      return c;
    } catch (e) {
      this.errors.push(new DataError('Error loading car', car));
    }
    return null;
  }

  loadDrone(drone) {
    try {
      const d = new Drone(drone.license, drone.model, drone.latLong);
      d.airTimeHours = drone.airTimeHours;
      d.base = drone.base;
      return d;
    } catch (error) {
      this.errors.push(new DataError('Error loading drone', drone));
    }
    return null;
  }

  validateCarData(car) {
    const requiredProps = ['license', 'model', 'latLong', 'miles', 'make'];
    let hasErrors = false;
    for (const field of requiredProps) {
      if (!car[field]) {
        this.errors.push(new DataError(`Invalid field ${field}`, car));
        hasErrors = true;
      }
    }

    if (Number.isNaN(Number.parseFloat(car.miles))) {
      this.errors.push(new DataError('Invalid mileage', car));
      hasErrors = true;
    }

    return !hasErrors;
  }

  validateDroneData(drone) {
    const requiredProps = ['license', 'model', 'latLong', 'base', 'airTimeHours'];
    let hasErrors = false;
    for (const field of requiredProps) {
      if (!drone[field]) {
        this.errors.push(new DataError(`Invalid field ${field}`, drone));
        hasErrors = true;
      }
    }
    if (Number.isNaN(Number.parseFloat(drone.airTimeHours))) {
      this.errors.push(new DataError('Invalid Air Time Hours', drone));
      hasErrors = true;
    }

    return !hasErrors;
  }
}
