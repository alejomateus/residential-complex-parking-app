import { Component, OnInit } from '@angular/core';
interface Item {
	id: number;
	nombre: string;
	email: string;
}

@Component({
	selector: 'kot-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
	// 1. Datos Originales
	itemsOriginales: Item[] = [
		// ... Carga tus 100, 200 o más registros aquí ...
		{ id: 1, nombre: 'Juan Pérez', email: 'juan.perez@ejemplo.com' },
		{ id: 2, nombre: 'Ana García', email: 'ana.garcia@ejemplo.com' },
		// ... más datos ...
		{ id: 21, nombre: 'Zoe Cruz', email: 'zoe.cruz@ejemplo.com' }
	];

	// 2. Variables de Paginación
	itemsPorPagina: number = 10;
	paginaActual: number = 1;
	totalItems: number = 0;
	totalPaginas: number = 0;
	itemsPaginados: Item[] = []; // Datos que se muestran en la vista

	constructor() {}

	ngOnInit() {
		this.totalItems = this.itemsOriginales.length;
		// Calcula el número total de páginas redondeando hacia arriba
		this.totalPaginas = Math.ceil(this.totalItems / this.itemsPorPagina);
		this.cargarPagina(this.paginaActual);
	}

	// Lógica para filtrar y cargar los datos de la página actual
	cargarPagina(pagina: number) {
		// Asegura que la página sea válida
		if (pagina < 1 || pagina > this.totalPaginas) return;

		this.paginaActual = pagina;
		const inicio = (pagina - 1) * this.itemsPorPagina;
		const fin = inicio + this.itemsPorPagina;

		// Filtra el array original para obtener solo los elementos de esta página
		this.itemsPaginados = this.itemsOriginales.slice(inicio, fin);
	}

	// Funciones de control de paginación
	paginaAnterior() {
		this.cargarPagina(this.paginaActual - 1);
	}

	paginaSiguiente() {
		this.cargarPagina(this.paginaActual + 1);
	}

	// Funciones de Acción
	verDetalle(id: number) {
		console.log('Ver detalle del item:', id);
		// Lógica de navegación o modal
	}

	eliminar(id: number) {
		console.log('Eliminar item:', id);
		// Lógica de eliminación (con confirmación)
	}
}
