### Estás obteniendo studentList y teacherList sin tener en cuenta el tipo de tabla que debes mostrar.
 Dependiendo de la cantidad de datos que esta API devuelva, es más eficiente solo obtener los datos que necesitas. Por ejemplo, si profType es 'alumnos', solo obtienes la lista de estudiantes, y si es 'profesores', solo obtienes la lista de profesores.
Llamabas a this.adminService.getByUserId(currentId) y this.studentsService.getAllStudents() y this.teachersService.getAll() sin manejar posibles errores de las promesas. 


### dataLoaded
 He incluido un flag de dataLoaded para indicar cuándo se han cargado los datos de la API y poder utilizarlo en tu template para evitar que se muestre hasta que los datos estén disponibles, lo cual mejora la experiencia de usuario.
 Eso evita que se pueda cargar la estructura de la tabla vacía, y que puedan transcurrir unos segundos hasta que se muestren datos, en caso de que la respuesta sea lenta.

### Subscription null
Subscription se inicializa como null. En ngOnInit, se asigna a la suscripción del Observable params. Luego, en ngOnDestroy, se verifica si subscription es null y si no lo es, se desuscribe y luego se asigna nuevamente a null.

### ngOnDestroy
Es importante desuscribirse de los Observables en ngOnDestroy por una razón principal: evitar las fugas de memoria. Si te suscribes a un Observable en un componente y luego el componente es destruido sin desuscribirse del Observable, el Observable todavía tiene una referencia al componente y continuará enviando eventos a él, incluso si el componente ya no existe. Esto puede causar fugas de memoria, porque los componentes que deberían haber sido limpiados por el recolector de basura de JavaScript no pueden serlo porque el Observable todavía tiene una referencia a ellos.

Al desuscribirte de los Observables en ngOnDestroy, te aseguras de que, cuando Angular destruya el componente, no queden referencias colgantes a él, permitiendo que sea limpiado correctamente. Es una buena práctica para mantener tu aplicación eficiente y libre de fugas de memoria.