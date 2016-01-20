(function () {
	PDFDocument = require('pdfkit');
	blobStream  = require('blob-stream');

	angular.module('mas.aporteMensualController', ['mas.scaleServices', 'mas.contributorServices', 'mas.aporteMensualServices'])

		.controller('aporteMensualController', ['$scope','$uibModal','scaleService', 'contributorService', 'aporteMensualService', function ($scope, $uibModal, scaleService, contributorService, aporteMensualService) {

			// $scope.selectedClass = "no-selected"
			$scope.selectedContributor = null;
			$scope.selectContributor = function (id) {
				$scope.selectedContributor = id;
				// console.log("Aportante seleccionado " + $scope.selectedContributor);
			}

			$scope.years = [];
			var date = new Date();
			var year = date.getFullYear();
			for (i = year; i >= year - 5; i--) {
				$scope.years.push(i);
			}

			$scope.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

			$scope.dateContrib = date;


			$scope.setAllDateContrib = function () {
				for (var i = 0; i < $scope.aportantes.length; i++) {
					$scope.aportantes[i].dateContrib = $scope.dateContrib;
				}
			}

			$scope.escalas = scaleService.getActives().then(function (data){
				$scope.escalas = data;
			});

			

			$scope.saveAll = function () {
				aporteMensualService.saveAll($scope.aportantes).then(function () {
					$scope.allAportantes();
				});
			}


			$scope.allAportantes = function () {
				aporteMensualService.all().then(function (data) {
					$scope.aportantes = data;
				});
			}

			$scope.allAportantes();

			$scope.printAportantes = function () {
				doc = new PDFDocument({
					layout: 'landscape',
					size: 'A4',
					margin: 50
				});

				stream = doc.pipe(blobStream());
				
				aporteMensualService.all().then(function (aportantes) {
					for (var i = 0; i < aportantes.length; i++) {
						for (var j = 0; j < 4; j++) {
							
							var pos = {
								numRec: {cx: 340, cy: 55},
								amountCab: {cx: 310, cy: 95},
								names: {cx: 110, cy: 120},
								dni: {cx: 100, cy: 140},
								tipo: {cx: 220, cy: 147},
								address: {cx: 110, cy: 155},
								amountBod: {cx: 180, cy: 175},
								month: {cx: 180, cy: 195},
								date: {cx: 300, cy: 210}
							}

							if (j == 1) {
								pos.numRec.cx = pos.numRec.cx + 400;
								pos.amountCab.cx = pos.amountCab.cx + 400;
								pos.names.cx = pos.names.cx + 400;
								pos.dni.cx = pos.dni.cx + 400;
								pos.tipo.cx = pos.tipo.cx + 400;
								pos.address.cx = pos.address.cx + 400;
								pos.amountBod.cx = pos.amountBod.cx + 400;
								pos.month.cx = pos.month.cx + 400;
								pos.date.cx = pos.date.cx + 400;
							}
							else if (j == 2) {
								pos.numRec.cy = pos.numRec.cy + 260;
								pos.amountCab.cy = pos.amountCab.cy + 260;
								pos.names.cy = pos.names.cy + 260;
								pos.dni.cy = pos.dni.cy + 260;
								pos.tipo.cy = pos.tipo.cy + 260;
								pos.address.cy = pos.address.cy + 260;
								pos.amountBod.cy = pos.amountBod.cy + 260;
								pos.month.cy = pos.month.cy + 260;
								pos.date.cy = pos.date.cy + 260;
							}
							else if (j == 3) {
								pos.numRec.cx = pos.numRec.cx + 400;
								pos.amountCab.cx = pos.amountCab.cx + 400;
								pos.names.cx = pos.names.cx + 400;
								pos.dni.cx = pos.dni.cx + 400;
								pos.tipo.cx = pos.tipo.cx + 400;
								pos.address.cx = pos.address.cx + 400;
								pos.amountBod.cx = pos.amountBod.cx + 400;
								pos.month.cx = pos.month.cx + 400;
								pos.date.cx = pos.date.cx + 400;
								//------------------------------ 
								pos.numRec.cy = pos.numRec.cy + 260;
								pos.amountCab.cy = pos.amountCab.cy + 260;
								pos.names.cy = pos.names.cy + 260;
								pos.dni.cy = pos.dni.cy + 260;
								pos.tipo.cy = pos.tipo.cy + 260;
								pos.address.cy = pos.address.cy + 260;
								pos.amountBod.cy = pos.amountBod.cy + 260;
								pos.month.cy = pos.month.cy + 260;
								pos.date.cy = pos.date.cy + 260;
							}


							doc.fontSize(13);
							doc.text(aportantes[i].num_rec, pos.numRec.cx, pos.numRec.cy);
							doc.text((aportantes[i].amount).toFixed(2), pos.amountCab.cx, pos.amountCab.cy);
							doc.fontSize(10);
							doc.text(aportantes[i].name + ' ' + aportantes[i].appaterno + ' ' +aportantes[i].apmaterno, pos.names.cx, pos.names.cy);
							doc.text(aportantes[i].dni, pos.dni.cx, pos.dni.cy);
							doc.text('X', pos.tipo.cx, pos.tipo.cy);
							doc.text(aportantes[i].address, pos.address.cx, pos.address.cy);
							doc.text((aportantes[i].amount).toFixed(2), pos.amountBod.cx, pos.amountBod.cy);
							doc.text(aportantes[i].month, pos.month.cx, pos.month.cy);
							doc.text(new Date(aportantes[i].dateContrib).format("dd        mm        yyyy"), pos.date.cx, pos.date.cy);
							
							if (j < 3) {
								i++;
							}

							if (j == 3 && i < aportantes.length -1) {
								doc.addPage();
								console.log("Otra pagina");
							}

							if (!(i < aportantes.length)) {
								break;
							}
						}
					}

					doc.end();

					var iframe = document.getElementById("pdfDisplay");

					stream.on('finish', function () {
						iframe.src = stream.toBlobURL('application/pdf');
					})
				});
				
			}


			var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
			var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

			function inWords (num) {
			    if ((num = num.toString()).length > 9) return 'overflow';
			    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
			    if (!n) return; var str = '';
			    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
			    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
			    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
			    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
			    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
			    return str;
			}
			
		}])

})();