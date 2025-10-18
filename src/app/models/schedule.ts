export interface Schedule {
	monday?: { label: string; hours: Hour[] };
	tuesday?: { label: string; hours: Hour[] };
	wednesday?: { label: string; hours: Hour[] };
	thursday?: { label: string; hours: Hour[] };
	friday?: { label: string; hours: Hour[] };
	saturday?: { label: string; hours: Hour[] };
	sunday?: { label: string; hours: Hour[] };
}

export interface Hour {
	start_time: string;
	end_time: string;
}
